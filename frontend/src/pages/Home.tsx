import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type FeatureProps = {
    title: string,
    body: string,
    img: string
}

const features = [{
    title: "Dashboard",
    body: "Quickly view and manage your daily transactions with ease.",
    img: "https://media.istockphoto.com/id/1503735047/photo/data-scientists-analyze-and-visualize-massive-data-on-virtual-screens-using-ai-to-process.jpg?s=1024x1024&w=is&k=20&c=a9mEe-bje9bczIQ1LBY410MlGSdEaRoRj6ULRO7rYMg="
}, {
    title: "Chart",
    body: "Analyze your weekly trends and performance with insightful charts.",
    img: "https://media.istockphoto.com/id/1503735047/photo/data-scientists-analyze-and-visualize-massive-data-on-virtual-screens-using-ai-to-process.jpg?s=1024x1024&w=is&k=20&c=a9mEe-bje9bczIQ1LBY410MlGSdEaRoRj6ULRO7rYMg="
},
{
    title: "Activity",
    body: "Efficiently track and manage your daily income and expenses.",
    img: "https://media.istockphoto.com/id/1503735047/photo/data-scientists-analyze-and-visualize-massive-data-on-virtual-screens-using-ai-to-process.jpg?s=1024x1024&w=is&k=20&c=a9mEe-bje9bczIQ1LBY410MlGSdEaRoRj6ULRO7rYMg="
}]


export function Home() {
    document.title = "Earning Tracker"
    return (
        <>
            <header className="h-96 bg-white w-5/6 p-10 text-left shadow-md rounded-md grid content-center mb-10">
                <div className="w-2/6">
                    <p className="text-3xl font-bold w-4/5">
                        Welcome to Earning Tracker
                    </p>
                    <span>
                        <Button className="my-4 mr-2">
                            Signup
                        </Button>
                        <Button>
                            Login
                        </Button>
                    </span>
                </div>
            </header>
            <p className="text-2xl font-semibold p-2">Features</p>
            <div className="grid grid-flow-row md:grid-flow-col gap-4 md:container lg:w-4/5">
                {
                    features.map((feature) => (
                        <FeatureCards {...feature} />
                    )
                    )
                }
            </div>
        </>
    )
}


function FeatureCards({ title, body, img }: FeatureProps) {
    return (
        <>
            <Card className="shadow-xl rounded-md mb-10">
                <CardHeader className="font-semibold text-xl">
                    {title}
                </CardHeader>
                <CardContent>
                    <img src={img} alt="" className="rounded-md" />
                </CardContent>
                <CardFooter className="self-end text-lg font-bolder text-left">
                    {body}
                </CardFooter>
            </Card>
        </>
    )
}