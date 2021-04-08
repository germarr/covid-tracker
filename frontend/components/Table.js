import styled from "styled-components"
import styles from "../styles/Table.module.css"

function Table({countries}) {
    return (
        <Container className={styles.table}>
            {countries.map(({country,cases})=>(
                <tr>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </Container>

    )
}


export default Table

const Container = styled.div`
    margin-top: 20px;
    overflow: scroll;
    height: 400px;
    color: #6a5d5d
`


