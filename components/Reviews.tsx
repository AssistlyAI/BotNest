import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from "lucide-react";

function Reviews() {
  const reviews = [
    {
      name: "Sarah Mitchell",
      role: "Customer Support Manager, FreshGlow Skincare",
      rating: 5,
      review:
        "Botnest made setting up our chatbot so easy! We had it live on our site in less than an hour, and it handles most of our customer inquiries instantly. It’s been a game changer for our support team.",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    //https://chat.openai.com/_sandbox/file_00000000b64c6230bacc1fbfbbec04c4/sarah_mitchell.png
    },
    {
      name: "Rajiv Patel",
      role: "Founder, Patel Electronics",
      rating: 4,
      review:
        "I’m not a tech person, but Botnest’s no-code builder was super simple. I just added a few details about my business and the chatbot was up and running. It even sounds like a real team member!",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    },
    {
      name: "Elena Garcia",
      role: "Marketing Director, Bloom & Beyond",
      rating: 5,
      review:
        "What I love most is how customizable the bot is. We tailored the tone and look to match our brand perfectly. Plus, the analytics help us understand what our customers really care about.",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    },
    {
      name: "James Liu",
      role: "Product Manager, NexaTech Solutions",
      rating: 4,
      review:
        "Botnest integrates easily with our existing tools and gives us clear insights into customer behavior. We’ve seen a noticeable drop in repetitive queries since using it",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    },
    {
      name: "Aisha Khan",
      role: "Operations Lead, QuickFix Services",
      rating: 5,
      review:
      "The real-time monitoring and performance tracking features are really helpful. We can see exactly how the bot is performing and tweak it on the go. Highly recommend!",
      avatar:
      "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    }
  ];

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill={index < rating ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-md md:max-w-screen-lg mx-auto"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full flex flex-col border-2 border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full border-2 border-blue-100"
                      />
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {review.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                          {review.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow pt-4">
                    <p className="text-gray-700 italic">"{review.review}"</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">
                      {review.rating}/5
                    </span>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="mr-4" />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Reviews;
