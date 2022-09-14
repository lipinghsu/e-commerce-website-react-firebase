import React, { useEffect } from "react";
import {
    TableContainer, Table, TableHead,
    TableRow, TableBody, TableCell
} from '@material-ui/core'

import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux/Orders/orders.actions";

const columns = [
    {
        id:'productThumbnail',
        label: ''
    },
    {
        id:'productName',
        label: 'Name'
    },
    {
        id:'productPrice',
        label: 'Price'
    },
    {
        id:'quantity',
        label: 'Quantity'
    },
    {
        id:'size',
        label: 'Size'
    },
]

const formatText = (columnName, columnValue) => {
    switch(columnName) {
        case 'productPrice':
            return `$${columnValue}`
        case 'productThumbnail':
            return <img src={columnValue} width={128} />
        default:
            return columnValue;
    }
}

const styles = {
    fontSize: '16px',
    width: '10%',
}

const OrderDetails = ({ order }) => {
    const orderItems =  order && order.orderItems;
    const dispatch = useDispatch();
    useEffect(() =>{
        // clear order details state
        return () =>{
            dispatch(
                setOrderDetails({})
            );
        }
    }, []);
    return(
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>

                        {columns.map((col, pos) => {
                            return(
                                <TableCell key= {pos} style={styles}>
                                    {col.label}
                                </TableCell>
                            )
                        })}

                    </TableRow>
                </TableHead>

                <TableBody>
                    {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((row, pos) => {
                        return(
                            <TableRow key={pos}>
                                {columns.map((col, pos) => {
                                    const columnName = col.id;
                                    const columnValue = row[columnName];
                                    return(
                                        <TableCell key= {pos} style={styles}>
                                            {formatText(columnName, columnValue)}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderDetails;