import { Button } from "@chakra-ui/react"

export const Buttons = ({ page, handlePageChange }) => {
    return (
        <Button onClick={() => handlePageChange(page)}>{page}</Button>
    )
}