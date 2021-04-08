import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components"

function Infobox({title, cases, total}) {
    return (
        <Container>
            <InfoboxTitle>
                <InfoboxTotal color="textSecondary">
                    {title}
                </InfoboxTotal>
                <h2>
                    {cases}
                </h2>
                <InfoboxTotal>
                    {total} Total.
                </InfoboxTotal>
            </InfoboxTitle>
        </Container>
    )
}

export default Infobox

const Container = styled(Card)``
const InfoboxTitle = styled(CardContent)``
const InfoboxTotal = styled(Typography)``
