import { Grid } from "@chakra-ui/react"
import { CategoryNav } from "../Components/CategoryNav"
import { ProductList } from "../Components/ProductList"
// import { Sidebar } from "../Components/Sidebar"

export const Products = () => {
    return (
        <div>
            <CategoryNav />
            <Grid>
                {/* <Sidebar /> */}
                <ProductList />
            </Grid>
        </div>
    )
}