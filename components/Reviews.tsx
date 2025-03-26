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
      name: "Sarah Thompson",
      role: "Product Manager, Tech Innovations Inc.",
      rating: 5,
      review:
        "This AI tool has completely transformed how our team approaches project analysis. The insights are incredibly precise, saving us weeks of manual work. It's like having a super-intelligent team member available 24/7.",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    },
    {
      name: "Michael Rodriguez",
      role: "Startup Founder",
      rating: 5,
      review:
        "As a solo entrepreneur, this platform has been a game-changer. The AI-powered insights help me make data-driven decisions quickly, giving me a competitive edge I never had before. The intuitive interface makes complex analysis feel effortless.",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    },
    {
      name: "Emily Chen",
      role: "Research Analyst",
      rating: 4,
      review:
        "Impressive AI capabilities that go beyond simple data processing. The tool provides nuanced insights and helps me uncover trends I would have missed. The collaboration features are robust and make team research a breeze.",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    },
    {
      name: "Karthik",
      role: "Research Analyst",
      rating: 4,
      review:
        "Impressive AI capabilities that go beyond simple data processing. The tool provides nuanced insights and helps me uncover trends I would have missed. The collaboration features are robust and make team research a breeze.",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/019/900/322/non_2x/happy-young-cute-illustration-face-profile-png.png",
    },
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
