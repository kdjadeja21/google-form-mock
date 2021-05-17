import _ from 'lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import UsersTableHead from './FormsTableHead';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Forms = (props) => {
    const dispatch = useDispatch();
    const formData = useSelector(state => state.forms.form.formsData);

    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(formData);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    useEffect(() => {
        dispatch(Actions.getForms())
    }, [dispatch])

    useEffect(() => {
        setData(formData);
    }, [formData]);

    const handleRequestSort = (event, property) => {
        const id = property;
        let direction = 'desc';

        if (order.id === property && order.direction === 'desc') {
            direction = 'asc';
        }

        setOrder({
            direction,
            id
        });
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            setSelected(data.map(n => n.id));
            return;
        }
        setSelected([]);
    }

    const handleClick = (item) => {
        props.history.push("/form/" + item.slug);
    }

    const handleChangePage = (event, value) => {
        setPage(value);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button className="newFormButton" onClick={() => props.history.push('/form/new')} color="primary" variant="contained" >New Form</Button>
                </Toolbar>
            </AppBar>

            {
                data.length === 0 ?
                    <div>
                        <Typography color="textSecondary" variant="h5">
                            No records!
                        </Typography>
                    </div>

                    :

                    <div className="table">

                        <Table component={Paper} aria-labelledby="tableTitle">
                            <UsersTableHead
                                numSelected={selected.length}
                                order={order}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length}
                            />

                            <TableBody>
                                {data.length > 0 && _.orderBy(
                                    data,
                                    [
                                        o => {
                                            switch (order.id) {
                                                case 'categories': {
                                                    return o.categories[0];
                                                }
                                                default: {
                                                    return o[order.id];
                                                }
                                            }
                                        }
                                    ],
                                    [order.direction]
                                )
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = selected.indexOf(n.id) !== -1;
                                        return (
                                            <TableRow
                                                className="cursor-pointer"
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                                onClick={event => handleClick(n)}
                                            >

                                                <TableCell padding="none">
                                                    <Checkbox />
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.name}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.slug}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.form_responses.length}
                                                </TableCell>

                                                <TableCell component="th" scope="row">
                                                    {n.created_at}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}

                            </TableBody>

                        </Table>
                        <TablePagination
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 15, { value: data.length, label: 'All' }]}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page'
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page'
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />

                    </div>
            }
        </>
    );
}

export default Forms;