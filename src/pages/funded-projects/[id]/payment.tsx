import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import PaymentMethodDropdown from "~/components/PaymentMethodDropdown";
import { api } from "~/utils/api";
import ReceiptModal from "~/components/ReceiptModal";
import LoadingSpinner from "~/components/LoadingSpinner";

interface Funding {
  title: string;
  description: string;
  image: string;
}

const Payment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [fundingData, setFundingData] = useState<Funding | null>(null);
  const [loading, setLoading] = useState(false);
  const [contributionType, setContributionType] = useState("Individual");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("PHP");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] = useState({
    card_number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "PH",
  });

  const paymentMethods = ["Card"];

  const getFunding = api.fundraiser.getById.useQuery({ id: id as string });

  const payment = api.paymentRouter.createPaymentIntent.useMutation();

  const createPaymentMethod =
    api.paymentRouter.createPaymentMethod.useMutation();

  const createGcashPaymentMethod =
    api.paymentRouter.createGCashPaymentMethod.useMutation();

  const attachPaymentIntent =
    api.paymentRouter.attachPaymentIntent.useMutation();

  const updateFunds = api.fundraiser.updateFunds.useMutation();

  const user = useUser();
  const updateDonor = api.donors.createDonor.useMutation();

  const createFunding = api.donors.createFunding.useMutation();

  const userEmail = user.user?.emailAddresses[0]?.emailAddress ?? "";

  const checkEmail = api.donors.checkEmailExists.useQuery({
    email: userEmail,
  });

  const handlePaymentMethodChange = (selectedMethod: string) => {
    setPaymentMethod(selectedMethod);
  };

  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    paymentID: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    fullName: string;
    email: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPaymentError(null);
    setLoading(true);

    const convertedAmount = parseInt(amount, 10) * 100;

    try {
      const paymentIntentResponse = await payment.mutateAsync({
        amount: convertedAmount,
        currency: currency,
      });

      if (paymentIntentResponse?.data.id) {
        let paymentMethodResponse;

        if (paymentMethod === "Gcash") {
          paymentMethodResponse = await createGcashPaymentMethod.mutateAsync({
            email: email,
            name: fullName,
            phone: phoneNumber,
          });
        } else {
          paymentMethodResponse = await createPaymentMethod.mutateAsync({
            details: {
              card_number: cardDetails.card_number,
              exp_month: parseInt(cardDetails.exp_month, 10),
              exp_year: parseInt(cardDetails.exp_year, 10),
              cvc: cardDetails.cvc,
            },
            billing: {
              address: {
                line1: cardDetails.line1,
                line2: cardDetails.line2,
                city: cardDetails.city,
                state: cardDetails.state,
                postal_code: cardDetails.postal_code,
                country: cardDetails.country,
              },
              name: fullName,
              phone: phoneNumber,
              email: email,
            },
          });
        }

        const idString = id?.toString() || "";

        // Attach payment intent to payment method
        await attachPaymentIntent.mutateAsync({
          payment_method: paymentMethodResponse.data.id,
          paymentIntentId: paymentIntentResponse?.data.id,
          client_key: paymentIntentResponse?.data.attributes.client_key,
          fundingId: idString,
        });

        // Update funds and donors in Fundraisers schema
        await updateFunds.mutateAsync({
          id: idString,
          funds: parseInt(amount, 10),
          donors: 1,
        });

        // Check if donor email exists
        if (!checkEmail.data) {
          await updateDonor.mutateAsync({
            userEmail: userEmail,
          });
        }

        // Create funding record
        await createFunding.mutateAsync({
          fundraiserId: idString,
          amount: parseInt(amount, 10),
          donorEmail: userEmail,
          paymentMethod,
          fullName: fullName,
          email: email,
          contact: phoneNumber,
          donatedAs: contributionType,
        });

        setPaymentDetails({
          paymentID: paymentIntentResponse?.data.id,
          amount: convertedAmount,
          currency,
          paymentMethod,
          fullName,
          email,
        });
        setIsReceiptModalOpen(true);
      } else {
        setPaymentError("Failed to create payment intent.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        "An error occurred during payment. Please check your details.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (getFunding.data && getFunding.data.project) {
          const fundingData: Funding = {
            title: getFunding.data.project.title,
            description: getFunding.data.project.description,
            image: getFunding.data.project.image,
          };
          setFundingData(fundingData);
        }
      } catch (error) {
        console.error("Error fetching funding data:", error);
      }
    };
    fetchData();
  }, [getFunding.data]);

  return (
    <>
      <Head>
        <title>Payment | Global Shapers</title>
        <meta name="description" content="Generated by create-next-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />
      
      {loading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-16 mt-24 flex max-w-[1300px] flex-col justify-between md:mt-32 lg:flex-row"
      >
        <div className="flex w-full flex-col items-center lg:w-1/2">
          {fundingData && (
            <div className="flex w-11/12 flex-col md:w-10/12 lg:w-11/12">
              <div className="mx-1 text-base font-normal text-gray-700 md:text-lg">
                YOU ARE DONATING TO:
              </div>
              <div className="mx-1 mb-4 text-3xl font-semibold text-gray-700 md:text-4xl">
                {fundingData.title}
              </div>
              <img
                src={fundingData.image}
                className="mb-2 h-[350px] w-full rounded-lg object-cover shadow-md md:h-96"
                alt={fundingData.title}
              />
              <div className="md:text-normal text-medium mx-1 line-clamp-3 text-sm font-light">
                {fundingData.description}
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col items-center justify-center lg:w-1/2">
          <p className="mt-12 text-xl font-medium md:text-2xl lg:mt-0">
            Contribute As:
          </p>
          <div className="mt-2 flex flex-row items-center">
            <div className="mt-2 inline-flex items-center">
              <input
                type="radio"
                name="contributionType"
                value="Individual"
                className="h-6 w-6 text-gray-600"
                checked={contributionType === "Individual"}
                onChange={() => setContributionType("Individual")}
                data-testid="Individual"
              />
              <span className="ml-2 mr-4 text-sm font-light md:text-lg">
                Individual
              </span>
            </div>
            <div className="mt-2 inline-flex items-center">
              <input
                type="radio"
                name="contributionType"
                value="Company"
                className="h-6 w-6 text-gray-600"
                checked={contributionType === "Company"}
                onChange={() => setContributionType("Company")}
                data-testid="Company"
              />
              <span className="ml-2 mr-4 text-sm font-light md:text-lg">
                Company
              </span>
            </div>
            <div className="mr-4 mt-2 inline-flex items-center">
              <input
                type="radio"
                name="contributionType"
                value="Anonymous"
                className="h-6 w-6 text-gray-600"
                checked={contributionType === "Anonymous"}
                onChange={() => setContributionType("Anonymous")}
                data-testid="Anonymous"
              />
              <span className="ml-2 text-sm font-light md:text-lg">
                Anonymous
              </span>
            </div>
          </div>
          {contributionType !== "Anonymous" && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className="my-2 w-11/12 border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none md:w-10/12 md:text-base lg:w-9/12"
                value={fullName}
                maxLength={50}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="my-2 w-11/12 border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none md:w-10/12 md:text-base lg:w-9/12"
                value={phoneNumber}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="my-2 w-11/12 border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none md:w-10/12 md:text-base lg:w-9/12"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          <div className="mt-6 flex w-11/12 rounded-md border border-gray-400 py-4 pl-4 pr-4 shadow-lg md:w-10/12 lg:w-9/12">
            <input
              type="text"
              placeholder="Amount"
              className="w-2/3 text-sm outline-none md:text-base"
              value={amount}
              required
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  const intValue = parseInt(value, 10);
                  if (value === "" || intValue >= 1) {
                    setAmount(value);
                  }
                }
              }}
            />
          </div>

          <PaymentMethodDropdown
            className="mt-6 w-11/12 rounded-md border border-gray-400 shadow-lg outline-none md:w-10/12 md:text-base lg:w-9/12"
            options={paymentMethods}
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            placeholder="Select Payment Method"
          />

          {paymentMethod === "Card" && (
            <div className="mt-6 w-11/12 rounded-md border border-gray-400 p-4 shadow-lg md:w-10/12 lg:w-9/12">
              <input
                type="text"
                placeholder="Card Number"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.card_number}
                inputMode="numeric"
                pattern="[0-9]*"
                required
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*$/.test(value)) {
                    setCardDetails({ ...cardDetails, card_number: value });
                  }
                }}
              />
              <input
                type="text"
                placeholder="Expiry Month"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.exp_month}
                inputMode="numeric"
                pattern="[0-9]*"
                required
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*$/.test(value)) {
                    setCardDetails({ ...cardDetails, exp_month: value });
                  }
                }}
              />
              <input
                type="text"
                placeholder="Expiry Year"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.exp_year}
                inputMode="numeric"
                pattern="[0-9]*"
                required
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*$/.test(value)) {
                    setCardDetails({ ...cardDetails, exp_year: value });
                  }
                }}
              />

              <input
                type="text"
                placeholder="CVC"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.cvc}
                required
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d*$/.test(value)) {
                    setCardDetails({ ...cardDetails, cvc: value });
                  }
                }}
              />

              <input
                type="text"
                placeholder="Address Line 1"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.line1}
                required
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, line1: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.line2}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, line2: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.city}
                required
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="State"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.state}
                required
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, state: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.postal_code}
                required
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    postal_code: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Country"
                className="my-2 w-full border-b border-gray-800 py-2 pl-2 pr-3 text-sm text-black outline-none focus:outline-none"
                value={cardDetails.country}
                required
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, country: e.target.value })
                }
              />
            </div>
          )}

          {paymentError && (
            <div className="mx-1 mt-3 text-center text-sm text-red-500">
              {paymentError}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-11/12 rounded-lg border border-gray-400 bg-blue-800 py-2 text-white hover:bg-blue-900 sm:w-10/12 lg:w-9/12"
            disabled={loading}
          >
            Pay Now
          </button>
        </div>
      </form>

      <Footer />

      {paymentDetails && (
        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          paymentDetails={paymentDetails}
          id={id?.toString() ?? ""}
        />
      )}
    </>
  );
};

export default Payment;
