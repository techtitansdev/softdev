import { z } from 'zod';
import axios from 'axios';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';

export const paymentRouter = createTRPCRouter({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        amount: z.number().min(1),
        currency: z.string().default('PHP'),
      })
    )
    .mutation(async ({ input }) => {
      const response = await axios.post(
        'https://api.paymongo.com/v1/payment_intents',
        {
          data: {
            attributes: {
              amount: input.amount,
              currency: input.currency,
              payment_method_allowed: ['card','gcash'],
              capture_type: 'automatic',
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
          },
        }
      );

      return response.data;
    }),

    attachPaymentIntent: publicProcedure
    .input(
      z.object({
        payment_method: z.string(),
        client_key: z.string(),
        paymentIntentId: z.string(),
        fundingId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await axios.post(
        `https://api.paymongo.com/v1/payment_intents/${input.paymentIntentId}/attach`,
        {
          data: {
            attributes: {
                payment_method: input.payment_method,
                client_key: input.client_key,
                return_url:`http://localhost:3000/funded-projects/${input.fundingId}`
            },
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
          },
        }
      );

      return response.data;
    }),

    retrievePaymentIntent: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const response = await axios.get(
        `https://api.paymongo.com/v1/payment_intents/${input.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
          },
        }
      );

      return response.data;
    }),
    createPaymentMethod: publicProcedure
    .input(
      z.object({
        type: z.string().default('card'),
        details: z.object({
          card_number: z.string(),
          exp_month: z.number(),
          exp_year: z.number(),
          cvc: z.string(),
        }),
        billing: z.object({
          address: z.object({
            line1: z.string(),
            line2: z.string().optional(),
            city: z.string(),
            state: z.string(),
            postal_code: z.string(),
            country: z.string(),
          }),
          name: z.string(),
          email: z.string().optional(),
          phone: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.log("Creating payment method with input:", input);

        const response = await axios.post(
          'https://api.paymongo.com/v1/payment_methods',
          {
            data: {
              attributes: {
                type: input.type,
                details: input.details,
                billing: input.billing,
              },
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
            },
          }
        );

      
        console.log("Payment method created successfully:", response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error
          console.error("Axios error creating payment method:", error.response?.data || error.message);
          throw new Error(error.response?.data?.errors?.[0]?.detail || 'Failed to create payment method');
        } else {
          // General error handling
          console.error("General error creating payment method:", error);
          throw new Error('An unexpected error occurred while creating the payment method');
        }
      }
    }),
    createGCashPaymentMethod: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        email:z.string(),
        name:z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.log("Creating GCash payment method with input:", input);

        const response = await axios.post(
          'https://api.paymongo.com/v1/payment_methods',
          {
            data: {
              attributes: {
                type: 'gcash',
                billing: {
                  phone: input.phone,
                  email:input.email,
                  name:input.name
                },
              },
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
            },
          }
        );

        console.log("GCash payment method created successfully:", response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error
          console.error("Axios error creating GCash payment method:", error.response?.data || error.message);
          throw new Error(error.response?.data?.errors?.[0]?.detail || 'Failed to create GCash payment method');
        } else {
          // General error handling
          console.error("General error creating GCash payment method:", error);
          throw new Error('An unexpected error occurred while creating the GCash payment method');
        }
      }
    }),
});

