import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import withAuth from "@/HOC/withAuth";
import { Link } from "react-router-dom";

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
    img: "https://img.freepik.com/premium-vector/bar-chart-with-line-graph-show-effectiveness-business-earning-planning-management_120819-711.jpg?w=900"
},
{
    title: "Manage",
    body: "Efficiently track and manage your daily income and expenses.",
    img: "https://i.pinimg.com/564x/36/27/af/3627af29a4e443d8eeb98f01aa69d081.jpg"
}]


function Home({ isAuth }: { isAuth: boolean }) {
    document.title = "Expense Tracker"
    return (
        <>
            <header className="h-96 bg-white w-full md:w-5/6 p-10 text-left 
            shadow-lg rounded-xl grid content-center mb-10
             grid-flow-col 
             bg-[url('https://cdn.dribbble.com/users/43762/screenshots/1193020/media/18e355ce88914a10ff30668836b1b997.gif')] 
             bg-no-repeat bg-center lg:bg-right
             bg-cover
             xl:bg-[length:730px]
             ">
                <div >
                    <p className="text-3xl font-bold text-white xl:text-gray-950">
                        Welcome to<br />Expense Tracker
                    </p>
                    <span className="grid gap-2  grid-flow-col w-10 mt-4">

                        {isAuth ?
                            <>
                                <Button className="bg-white text-black hover:bg-slate-100 xl:bg-slate-950 xl:text-white xl:hover:bg-slate-950">
                                    <Link to={"/dashboard"}>
                                        Dashboard
                                    </Link>
                                </Button>
                                <Button variant={"outline"}>
                                    <Link to={"/activity"}>
                                        Activity
                                    </Link>
                                </Button>
                            </>
                            :
                            <>
                                <Button className="bg-white text-black hover:bg-slate-100 xl:bg-slate-950 xl:text-white xl:hover:bg-slate-950">
                                    <Link to={"/signup"}>
                                        Signup
                                    </Link>
                                </Button>
                                <Button variant={"outline"}>
                                    <Link to={"/login"}>
                                        Login
                                    </Link>
                                </Button>
                            </>
                        }

                    </span>
                </div>
            </header>
            <p className="text-2xl font-semibold p-2 mb-3">Features</p>
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 md:grid-flow-col gap-4 md:container lg:w-4/5">
                {
                    features.map((feature) => (
                        <FeatureCards {...feature} key={feature.title} />
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
            <Card className="shadow-xl rounded-xl mb-10 w-full">
                <CardHeader className="font-semibold text-xl text-center">
                    {title}
                </CardHeader>
                <CardContent className="w-full h-48 overflow-hidden aspect-square">
                    <img src={img} alt="" className="rounded-md " />
                </CardContent>
                <CardFooter className="self-end text-lg font-bolder text-left mt-3">
                    {body}
                </CardFooter>
            </Card>
        </>
    )
}

export default withAuth(Home, { showLoader: true, requireAuth: false })