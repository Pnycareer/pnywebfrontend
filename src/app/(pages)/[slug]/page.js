import Detailpage from "./Detailpage"


export default async function Page({ params }) {
    const result = await params

    return (
        <>
        <Detailpage params={result}/>
        </>
    )
}