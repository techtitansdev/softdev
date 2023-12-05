import Head from "next/head";
import Link from "next/link";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";

const Tech4all = () => {
  return (
    <>
      <Head>
        <title>Global Shapers Iloilo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/gsi-logo.png" />
      </Head>

      <Navbar />

      <div
        className="flex max-h-[800px] flex-col items-center pb-12 xl:h-screen xl:flex-row-reverse"
        style={{
          backgroundImage: "url(/tech4all-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-[1230px]">
          <div className="mt-28 flex items-center justify-center text-4xl font-medium md:text-5xl xl:mt-12">
            <img src="/tech4all.jpeg" className="mr-2 w-12 rounded-lg" />
            Tech For All
          </div>

          <div className="mt-12 flex flex-col-reverse items-center md:mt-24 md:flex-row">
            <div className=" w-full flex-col items-center justify-center md:w-1/2">
              <p className="mb-4 mt-4 px-6 text-2xl font-semibold text-gray-800 sm:text-3xl md:mt-0 lg:text-4xl xl:px-0">
                What is Tech For All?
              </p>
              <p className="mb-2 px-6 text-sm font-light text-gray-800 sm:text-base md:max-w-[530px] lg:text-lg xl:px-0">
                Tech For All is an initiative by Global Shapers Iloilo Hub,
                dedicated to bridging the digital divide, enhancing digital
                literacy, advocating for equitable tech opportunities, and
                ensuring that the benefits of technology are accessible to a
                broad and diverse audience.
              </p>
              <p className="mb-2 px-6 text-sm font-light text-gray-800 sm:text-base md:max-w-[530px] lg:text-lg xl:px-0">
                We ensure that everyone, regardless of their background or
                circumstances, has equal access to the opportunites and benefits
                that technology offers, fostering inclusive growth for all.
              </p>

              <p className="mb-2 px-6 text-sm font-light text-gray-800 sm:text-base md:max-w-[530px] lg:text-lg xl:px-0">
                Connect with us:
                <Link
                  href={"https://www.facebook.com/tech4all.iloilo"}
                  className="ml-2 font-medium text-blue-800 underline"
                >
                  Tech4All
                </Link>
              </p>
            </div>
            <div className="w-full px-6 md:w-1/2 md:max-w-[580px] xl:ml-8 xl:px-0">
              <img
                src="/tech4all-pic1.png"
                alt="Mission"
                className="h-80 w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center text-3xl font-medium text-green-900 md:text-4xl">
        Project Objectives
      </div>

      <div className="mx-auto mt-4 max-w-[950px] px-4 text-center text-sm md:text-base">
        Delve into the project objectives that aims to empower individuals and
        communities through digital literacy and skills development, inclusive
        innovation, and socioeconomic empowerment.
      </div>

      <img
        src="/project-objectives.png"
        className="max-w-1250px mx-auto mb-12 mt-2"
      />

      <div className="mx-auto mb-10 w-full max-w-[1250px] columns-2 gap-4 space-y-4 p-5 pb-10 md:columns-3 lg:columns-4">
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/386696826_122117385518040060_6331415862878838666_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGrnYqZhvcsQIQakot951gJJZ6-zJGr5jIlnr7MkavmMtJq2kB3E7WT50KaC7Kw73D6HiLi5RornDhdrwy5Bzs4&_nc_ohc=CvUKxoAsUBEAX-U_9k_&_nc_ht=scontent.fceb1-3.fna&oh=00_AfBQ5Ey51924lT-fu1Tt9YHk-OIUsvXt9q5buJFx2PsKyQ&oe=65733E8F" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/386351551_122117385038040060_3550096382778176216_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGAORQy-hVZ31stH4y3JsgrijJCU2rV7qiKMkJTatXuqBBPQ1mC8pVru7wZoMJIwKFW3Uy05E-xkMFCD2NRTmc_&_nc_ohc=8hA78DDaf5IAX_Pd2RW&_nc_ht=scontent.fceb1-3.fna&oh=00_AfC_pAmPmKKftxvuoQEct96UVEmNTFec-9SPptHPEK_FYw&oe=6572DDC8" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/387148541_122117458118040060_861936244001752129_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeEt5TfGY_m0jXTXQ0TzmzAo71Y8wWVhISjvVjzBZWEhKNxL48aRO7Sbh0t6A_wLEgKDL9_i35keay1IS3OXQBRn&_nc_ohc=IXZopsgrxhgAX-B1fOM&_nc_ht=scontent.fceb1-2.fna&oh=00_AfCSDbvvnmU0UQ_u6rLET-UdA3V-lMNTg2Kq1SHxknZ3Jg&oe=6572DC07" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/386357023_122117385578040060_2289101041063677690_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFnjSXiptZRFeklfMzchHH7iFjeFme7LeiIWN4WZ7st6BXVhO1XQRtpkgVrasyQw-DQFeiAU-q1ZAnhcODpRKyn&_nc_ohc=nYkLDrbOyWQAX-NdN2x&_nc_ht=scontent.fceb1-2.fna&oh=00_AfDgh7D2rj2Shjkm7hTomKFbYrMUcE6DycgRyXVVUK5U7Q&oe=65748129" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/386423107_122117460932040060_760307763248149361_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFDkW2v4d8PE04FVIvEwMiR0d4vV05WufrR3i9XTla5-phb6AdLbAywoILgc90wBg9TXGYHE7pdUsQ1aK1v0UYu&_nc_ohc=0WxEvlpnkGIAX86Kr-r&_nc_ht=scontent.fceb1-1.fna&oh=00_AfBfTSoVRe8mDNvkb25YvHLMJAIycA981icEqAEKLhawlw&oe=6573BEBB" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/385911559_122117460764040060_1645583875146231113_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGzPGeCMPnrL3lG4cNsgv5JM2mc7tZxzPAzaZzu1nHM8EGzIhqomCqReFjGlYoGKpH4dAKDH_UnMsCH-q7vfcE3&_nc_ohc=Ac4qjhOh-G8AX98H2FL&_nc_ht=scontent.fceb1-3.fna&oh=00_AfCnf4stXC7J60dP9p6MlScQm51m7XLviXl9PbbO11M5og&oe=657493E2" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/386510909_122117757338040060_8365988934808988766_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeE5RHMdtCwOnetQ_px8r3BlIK1VFjz_DacgrVUWPP8Np-Ru_mSbwzVw5Y9-Tpy2Tpvcn9bgdBpoxXPzCr1BLHaZ&_nc_ohc=A3cjGumkAgsAX80HgJU&_nc_ht=scontent.fceb1-3.fna&oh=00_AfAcEIejyE-j5Tv_8qSlyZpuvaJLaQc0ebiGYezuGfxBbw&oe=657448E7" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/386780706_122117759012040060_6806746981494386179_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFO1SYvb0bucpdQqyrpXP3xqRK3gYxC-IKpEreBjEL4gjv_iNcezpYjLIfDRmUjwa7_shVx1pjXSsEJu6BV99J9&_nc_ohc=SfHs_HcgN-4AX_PEyeR&_nc_ht=scontent.fceb1-1.fna&oh=00_AfCDoTFALmJI_L1s4vTJ_Jy1ZkGU80XjmX8mNXz6Wmg6IA&oe=65731E22" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/385840534_122117836916040060_2197506554177220562_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeEawR5LK9kzrOm-XAB_pSuF50vm9rsFz6bnS-b2uwXPpujnXL7ffa2_WizANy7dam_DD7BneCBtzL7iv4riWcGT&_nc_ohc=B9gjDuoGW-8AX_Gi1Ct&_nc_ht=scontent.fceb1-2.fna&oh=00_AfBJy27RnL91xZBcFqTDONEoNz1BXk6_5ARRaDp-9aMZmQ&oe=657415EF" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/386376867_122117849270040060_5609943392252763878_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeHkxxXklY-hRIVT3pk6nKsweNP_X1UeuwJ40_9fVR67AnIzR4t0Gui-Zop1KTecPbzS_Ly43TS0yBneBaEsc0jv&_nc_ohc=MwlPcBGkSHMAX-KHVDE&_nc_ht=scontent.fceb1-1.fna&oh=00_AfA7oD78nzIqvWKc5v8RBagWc53_OceUfrW-YzVDT7yYig&oe=65747E5B" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/400505975_122126621366040060_6143977165041233381_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeG0-IN1WcBrrLRe97Ncw_NWho1Cd-k1s7CGjUJ36TWzsL5yWAX--DhqgxPpHB8HGVmCGYXzX81Wy_HsQ5PbpUtI&_nc_ohc=d0bvt6kIeukAX-czBa8&_nc_ht=scontent.fceb1-3.fna&oh=00_AfATas9QhBhqnXmfB3uVeyWKJO7UNmjKCFJnunjrCUhQMA&oe=65742C8D" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/401791370_122128264988040060_7627982965717169920_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeFDUz70xM3qkHkSeCtV-FPUjUP4xu9WTnSNQ_jG71ZOdCQ4xUBhdeM5IO3ef48up3HbmUhj44lSHCZeZ4e3f1l3&_nc_ohc=-CfFou2KVzAAX9vCrfc&_nc_ht=scontent.fceb1-2.fna&oh=00_AfArEG6y5td4EH-eWw3KYRJPCcEbGrEgv2indsgz0ABOFw&oe=65734BDF" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/400355920_122126621384040060_7932638676063115435_n.jpg?stp=c188.0.414.414a_dst-jpg_p552x414&_nc_cat=102&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeFUvuTDmMTaOuehuSdu8cWQF4262Bcs5VAXjbrYFyzlUHkG5QBRVTXhfZx7eT5zQDIFcBOSMX4Foi-UNaDxtEAv&_nc_ohc=cWZrOUwWrTAAX8P3oBN&_nc_oc=AQmS6JpABeGnMvAOAbAXQjG2sl8XAgafXHsPimkt7jThejpZrs5KCg5mp9Mx4ZOrdho&_nc_ht=scontent.fceb1-3.fna&oh=00_AfBs7T7iX7RRIw_bavdR1hwRu7QoY4ygh-JelYx3kP_u8g&oe=65743371" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/399637933_122126628968040060_3816432870654094657_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeEgs_D66G89n5Bz3s_Gplb98CISv371S6zwIhK_fvVLrHymx-dlRYCJrEFP7NR3VesrkeuYQd0s9IS_x44pVvIx&_nc_ohc=uaxTY9X4HN0AX8SdR9P&_nc_ht=scontent.fceb1-2.fna&oh=00_AfAAhhlWOnGC9TuvIukcqygrzq9ugUfiicooIkbwVon44w&oe=6573D974" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/400410154_122126728742040060_7983335116801313140_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeE2MsTva26N8rJ5FdoVdOrIsdO0aD9hPcKx07RoP2E9wgJn1BlvDyXMQWrf8RW2CaYI7ML7BnDkbsR_SGYU4e4E&_nc_ohc=g6gms6mk0UEAX9dfR_Z&_nc_ht=scontent.fceb1-2.fna&oh=00_AfD56dlYSXHTfAfb-b9jZ_1fk22giuNUXHFL3pOs3zCdUg&oe=6573A142" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/400358587_122126782136040060_623298632224200269_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGh8zSO0R7lw8aeHvWpUDMe4npyjbzlcVHienKNvOVxUeuipF5i-Owg6gH4bwD5s9ccuyFaCsrlz9ecHOFuh90c&_nc_ohc=qFwGZzJFFvAAX-XUlQi&_nc_ht=scontent.fceb1-2.fna&oh=00_AfAgcRlWBJGTtcxH9tmNKqdzlyhUusnJZ4OypKkVswZi9w&oe=65735248" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/400479869_122126782694040060_3343406395956919238_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeF1EOil20lE74sLebIin6cuk2z14QHDJ4mTbPXhAcMniR4bHceWg2W-EkRF5HjftGlPdkpsaIjbTXnhz7rOhSMR&_nc_ohc=_n3qDKf23_IAX98gh5B&_nc_ht=scontent.fceb1-2.fna&oh=00_AfAsrmn4UnQNdPm-tJS3QzUCX2qeloK-aOD_E3wtvi8cFg&oe=657437E3" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/400395263_122126784434040060_8197902152358511909_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGlhloDqcJUgBNXJ7hXFSh9Y9Zf1LFyJiJj1l_UsXImIr25e6fY4KxLlEW0b4oHdf6620XkrJmWdcKZLe0Z6b88&_nc_ohc=_iKKoi4kRD4AX_opAD9&_nc_ht=scontent.fceb1-1.fna&oh=00_AfAb4fNo-rVSm65cpFF-2q0WbKOek3Vj8hw7M9icZb3paw&oe=65741FB4" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/400121864_122126784890040060_2686654938199416798_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeE94pa1IssI3hGSL7LgikxFm-PKWdZEpheb48pZ1kSmF7z3QqFUsHqzCNlaC2cIMAiXiPpxQ9064aMwdUxAuIEi&_nc_ohc=PMBh0DR8--MAX_QOVIc&_nc_ht=scontent.fceb1-2.fna&oh=00_AfDfRXfL8WgINcfPfdHBhJ3F_3IDbmvT81nbcsFq_erwnA&oe=65737F32" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/400614009_122126785694040060_5931332179093599674_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeHQMRT7YPlxd1PFTLEqjS_bE_Mi662LEKQT8yLrrYsQpAa-VEpBpwB-tOW7w95Y7uHK7tBRsqgY-kL2wpL9SOeM&_nc_ohc=gEUhHoED9WMAX_pG0xi&_nc_ht=scontent.fceb1-1.fna&oh=00_AfAZlhn2m6KO9foBqmpKRyoSjCJOtYg9UjK3QE9f4tfpJA&oe=6573BFB8" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/400383982_122126786264040060_3905587147343445000_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFG3eV9l8itoXOUZ7bpM19bDfXt4QoNgS8N9e3hCg2BL7978XEosWVDqHoHRbbsvYe0Ki46fxVBQ6P_LjE78CnC&_nc_ohc=Qt6BkUrdl8cAX8unegU&_nc_ht=scontent.fceb1-2.fna&oh=00_AfDxtpiTwhep7gQ2LTmmvlg2xdLFgX9S00f5KIJ79JipnA&oe=6574CA8E" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/400361280_122126945870040060_248835567979639348_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEqAw0uH3h0suSergnvbhN7WngbBPiyHpRaeBsE-LIelIrHqQx4Zay7JPMu1dQaSwlCPKA1IXjVJewSXX9fUglK&_nc_ohc=-1ZO_DlEud0AX8roJJK&_nc_ht=scontent.fceb1-2.fna&oh=00_AfCjyMq-Jh34XRzjnx6VjLRXDx2hgUMfgQD7eYCyYpK1Uw&oe=6573D81F" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/400380859_122127001118040060_4218706095606925526_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeEIfhGZud-1wD8Ao3EB-BkV80CmpBzb1UzzQKakHNvVTLW-bwVq4qBXcZLR26UevXrqnR7_CefnSkgONr84g60D&_nc_ohc=7DrIluecIKAAX99DHxk&_nc_ht=scontent.fceb1-3.fna&oh=00_AfB9UuO5Ql2aoLPsUNZgPBcFfTwMRJFI_jnIrr6dEN0uLg&oe=65735888" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/400431762_122127001064040060_48222315987592265_n.jpg?stp=c188.0.414.414a_dst-jpg_p552x414&_nc_cat=106&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeEfx_lauHrmZjO2EEJiwU8nCb6ztXe09LYJvrO1d7T0tny3e9Yb20oGriPML4eq2fSUV0mMAzuvkQokVJTuWJLd&_nc_ohc=RQ0SaygVVDcAX-s4e-P&_nc_ht=scontent.fceb1-3.fna&oh=00_AfDLE1C7KLgydkoQ6AFO2-W1EcCPDqBBcTnY0g51NnGGZA&oe=657488D7" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/400415864_122127000344040060_5198319121315934016_n.jpg?stp=c188.0.414.414a_dst-jpg_p552x414&_nc_cat=104&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeGZA4vFNKIBEq8OcKkplKqvbqkO49Yg6aBuqQ7j1iDpoA65h7Fb0RISE2Y1-75COChvgJZtYgTkxe2d6oxJtjO0&_nc_ohc=Ud2zUJXpLXUAX-cWXY_&_nc_ht=scontent.fceb1-3.fna&oh=00_AfBNQPsXOI-xQOr8_-tzdH4Wot8KKWZcUj1ZxuOQ-O7QzA&oe=65736A25" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/400441885_122127000920040060_4028344268400718186_n.jpg?stp=c188.0.414.414a_dst-jpg_p552x414&_nc_cat=110&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeEHDKUYUfQPawmcBTNe5h-dijL9k9n5b-WKMv2T2flv5R1T6YRkpnbxF0_SnY5XLaXdLnlXQ5ML6QBYw96-Ekhu&_nc_ohc=0mMxQam2VjgAX-__Tyc&_nc_ht=scontent.fceb1-2.fna&oh=00_AfBe3pVh0vIq-k734MlIvjOYrtGKBo9DxSg8I3PsrY0GYA&oe=657385B1" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/402159846_122128267514040060_8346410493135519875_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeGtCTIgvv-OaRJfRuwPzqOayGJyxserfrXIYnLGx6t-tRx1q_czfGmJ4Y_3l_IK9xciA7Qn5FFCFd9zvaOsEgUr&_nc_ohc=cYnR07_zxk0AX8oOTlE&_nc_ht=scontent.fceb1-3.fna&oh=00_AfA19tWolNMbU0mIbgoDZkhluuULEUQ-3j4ZZZ_bgDdffw&oe=6574CFC5" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/402115412_122128269500040060_5120771334820782195_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeEPldi_CcA2qLq0dsuJ9S2eOyf2BttVfAU7J_YG21V8BUFAoVuz3cGZRGfNn7C9LJJ10BW-EtVYi1CdesxTM9fx&_nc_ohc=YFQqWCj43FMAX8uLyCU&_nc_ht=scontent.fceb1-1.fna&oh=00_AfBZfS1OtP3_r7SJnneLL9DNHSWLAs910ULP8H3ZK0P94A&oe=6573564A" />
        <img src="https://scontent.fceb1-2.fna.fbcdn.net/v/t39.30808-6/404947893_122129521964040060_1671309058185798470_n.jpg?stp=c166.0.414.414a_dst-jpg_p552x414&_nc_cat=100&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeE750QmaMa_5NnNOFTZmqXl3P6tH6GlfVbc_q0foaV9VkIfLKqW3fowFYxSrR_0bIAvsQDYPWIoSuzKyNt37eZP&_nc_ohc=UTwhM8MWnDMAX9DnqMM&_nc_oc=AQkLJPsKZZmIV1liD47jjJQKdtr7IkN5uCxqxANqoENuPWW6oC3Db3xZHgfC05vifag&_nc_ht=scontent.fceb1-2.fna&oh=00_AfDm-nXXz25SlxoUzYQEv7rwTVGhmOYUINgbLBvfN2mzNA&oe=65740A7A" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/405184916_122129522348040060_868013304345743485_n.jpg?stp=c166.0.414.414a_dst-jpg_p552x414&_nc_cat=102&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeEBrjxeL86Ai0mje85RShVVz_fwI0TU9_nP9_AjRNT3-QGM-w55Uj-7TBkyxV5mCR86ljCVfqTYUGgVEwsS8Fm-&_nc_ohc=zH4pxo4lswIAX-89BgF&_nc_ht=scontent.fceb1-3.fna&oh=00_AfCSss0hx1l1cGFCN_Var3bxtqeQwdBAw9ayVF3aMYNBmQ&oe=657491D2" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/405179073_122129577800040060_617865686459285790_n.jpg?stp=c0.135.1638.1638a_dst-jpg_s552x414&_nc_cat=103&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeGcEbUMWvhecqsrvG9JzriryI58G5sAGbLIjnwbmwAZstFjT3o4GMobNllYM6GUqFsQRFQ4zTYLk86JllcChc0f&_nc_ohc=02MPop2hYDQAX_40aaR&_nc_ht=scontent.fceb1-3.fna&oh=00_AfAGhoDGpajvQgT80QESAKdQQqbUsyCsvvvEIB3mcsrUHQ&oe=657393EF" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/405169910_122129578238040060_946639739167109545_n.jpg?stp=c0.135.1638.1638a_dst-jpg_s552x414&_nc_cat=101&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeGS85WhD9K1pkFfWI7gIPjB1fYdACxBianV9h0ALEGJqYmTArStE4FRyZFMusSut-UKr_I3JIlwnCP6wrEGrfqu&_nc_ohc=rz_yv7--fnYAX-fGCUD&_nc_ht=scontent.fceb1-1.fna&oh=00_AfC21dYgT-UReLg7TCYGCwWQHXiZfyNR8YXA7Xi9z-vVwQ&oe=6573C603" />
        <img src="https://scontent.fceb1-3.fna.fbcdn.net/v/t39.30808-6/405236546_122129579126040060_6783924507713359345_n.jpg?stp=c0.135.1638.1638a_dst-jpg_s552x414&_nc_cat=103&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeFPuBdRH4Z6zMt3xFIaeVrtkgJXQn5xN7-SAldCfnE3vyw5LlrXH9awktYvb3KEtszDZnBS8dIP3t_mYz9KKHlV&_nc_ohc=MT_IEW3KZUkAX-Nqb5S&_nc_ht=scontent.fceb1-3.fna&oh=00_AfBg4lQdf8BmxFjmipQGwiplm6Io8eCfbJryLvmTnn7Wqg&oe=6572DA6E" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/404990545_122129769284040060_7863121724166171288_n.jpg?stp=c166.0.414.414a_dst-jpg_p552x414&_nc_cat=105&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeGQ_r3LfG4Q5x4tTFBNhSPJFe2urlr0ab8V7a6uWvRpv1pxvWfON3x0GllbBmdU2uE_sDmtw0J2QuY3s6VrxuZ8&_nc_ohc=jmvnffbHINgAX_i4Dyd&_nc_ht=scontent.fceb1-1.fna&oh=00_AfA8oWsEG4O7aYC2oIfPVTMdEge-4zv9gwYUaA2-s2swYw&oe=657442E8" />
        <img src="https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/405280265_122129768798040060_2764260354807969899_n.jpg?stp=c166.0.414.414a_dst-jpg_p552x414&_nc_cat=101&ccb=1-7&_nc_sid=3d9721&_nc_eui2=AeFH5s0Hnl-zgV2pC_dXm86HnSidLqpj1TydKJ0uqmPVPB8sTVpy12eg1lZZWIFMU3gvXqDuD5ZSeGaXZBmu4WxO&_nc_ohc=09RbI3wjESEAX9J75fa&_nc_ht=scontent.fceb1-1.fna&oh=00_AfCJ_dBUMagrrCcaHTrsQku1-QkkGQ2dHr3z_9K9bnJaFw&oe=6574A982" />
      </div>

      <Footer />
    </>
  );
};

export default Tech4all;
