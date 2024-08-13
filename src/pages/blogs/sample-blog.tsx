import Head from "next/head";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import Image from "next/image";

const SampleBlogData = {
  blogTitle: "Annual Curator’s Meeting 2023 of Global Shapers at the World Economic Forum in Geneva, Switzerland.",
  blogDescription:
    "“Whatever you do, you have to do it with passion” – Professor Schwabof Schwab Foundation for Social Entrepreneurship during the AnnualCurator’s Meeting 2023 of Global Shapers at the World Economic Forumin Geneva, Switzerland.",
  blogImage: "/blog1.jpg",
  blogDescription1:
    "It was indeed an incredible experience to have met more than 500 shapers across 145 countries and learn about how they are each making a difference in their own hubs. The simple question “whatdo you do?” becomes so powerful in realizing how we have diversebackgrounds and yet have so many similarities, including how weenvision to change the world. I’ll always be grateful to Strikeand James Daniel for trusting me to represent the Iloilo Hub inthis year’s Shaper Summit. When I get back, I look forward to sharing all the learnings I have gained with the Global Shapers Iloilo Hub.",
  blogImage1: "/blog3.jpg",
  blogDescription2:
    "Of course, this experience wouldn’t be complete without my crazy moments with Mark, Dan2x, Jason Occi and our Community Champion Henna across PH hubs who are all inspiring and passionate! I can’t name and tag all the global shapers I met but I’m so grateful to have met each and every one of you! This is definitely not the end but the beginning of more collaborations and lasting friendships. Let me know if you’re interested to join our growing community! There might be a hub near you! ❤️ Get to know more about Global Shapers and what our extraordinary community is doing: https://www.globalshapers.org",
  blogImage2: "/blog2.jpg",
};

const SampleBlog = () => {
  return (
    <>
      <div>
        <Head>
          <title> Blog | Global Shapers </title>
          <meta name="description" content= "Generated by create-t3-app" />
          <link rel="icon" href="/gsi-logo.png" />
        </Head>

        <Navbar />

        <div className="mx-auto lg:max-w-[1200px]">
          <div className="mb-4 flex items-center px-2 pt-20 text-2xl font-medium md:pt-32 md:text-3xl lg:max-w-[980px] lg:text-4xl">
            {SampleBlogData.blogTitle}
          </div>

          <div className="mb-6 flex items-center  px-2 text-sm md:text-base lg:max-w-[980px]">
          {SampleBlogData.blogDescription}
          </div>


          <Image
            src={SampleBlogData.blogImage}
            alt="blog-image"
            width={1200}
            height={200}
            className="px-2"
          />

          <div className="flex flex-col-reverse items-center px-2 pt-4 lg:flex-row lg:pt-16">
            <div className="w-full flex-col items-center justify-center lg:w-1/2">
              <Image
                src={SampleBlogData.blogImage1}
                alt="blog-image1"
                className="mx-auto w-full"
                width={600}
                height={300}
              />
            </div>

            <div className="mt-2 w-full rounded-md  lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
              <p className={` mb-4 text-sm sm:mb-8 sm:mt-8 md:text-lg`}>
                {SampleBlogData.blogDescription1}
              </p>
            </div>
          </div>

          <div className="mb-12 flex flex-col items-center px-2 pt-4 lg:flex-row lg:pt-16">
            <div className="w-full flex-col items-center justify-center lg:w-1/2">
              <p className={` mb-4 text-sm sm:mb-8 sm:mt-8 md:text-lg`}>
                {SampleBlogData.blogDescription2}
              </p>
            </div>

            <div className="mt-2 w-full rounded-md  lg:w-1/2 lg:max-w-[650px] lg:pr-6 xl:ml-12 xl:px-0">
              <Image
                src={SampleBlogData.blogImage2}
                alt="blog-image2"
                className="mx-auto w-full"
                width={600}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SampleBlog;