import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';

const rows = [
    {
        id: 'name',
        align: 'left',
        disablePadding: false,
        label: 'Name',
        sort: true
    },
    {
        id: 'slug',
        align: 'left',
        disablePadding: false,
        label: 'URL',
        sort: true
    },
    {
        id: 'form_responses',
        align: 'left',
        disablePadding: false,
        label: 'Response',
        sort: true
    },
    {
        id: 'created_at',
        align: 'left',
        disablePadding: false,
        label: 'Created At',
        sort: true
    },
];

const useStyles = makeStyles(theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
}));

function FormsTableHead(props) {
    const classes = useStyles(props);
    const [selectedClassMenu, setSelectedClassMenu] = useState(null);

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    function openSelectedClassMenu(event) {
        setSelectedClassMenu(event.currentTarget);
    }

    function closeSelectedClassMenu() {
        setSelectedClassMenu(null);
    }

    return (
        <TableHead>
            <TableRow className="h-64">
                <TableCell padding="none" className="relative w-64 text-center">
                    <Checkbox />
                    {props.numSelected > 0 && (
                        <div
                            className={clsx(
                                'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10',
                                classes.actionsButtonWrapper
                            )}
                        >
                            <IconButton
                                aria-owns={selectedClassMenu ? 'selectedClassMenu' : null}
                                aria-haspopup="true"
                                onClick={openSelectedClassMenu}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                            <Menu
                                id="selectedClassMenu"
                                anchorEl={selectedClassMenu}
                                open={Boolean(selectedClassMenu)}
                                onClose={closeSelectedClassMenu}
                            >
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            closeSelectedClassMenu();
                                        }}
                                    >
                                        <ListItemIcon className="min-w-40">
                                            <DeleteIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Remove" />
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    )}
                </TableCell>
                {rows.map(row => {
                    return (
                        <TableCell
                            style={{ fontWeight: "bold" }}
                            key={row.id}
                            align={row.align}
                            padding={row.disablePadding ? 'none' : 'default'}
                            sortDirection={props.order.id === row.id ? props.order.direction : false}
                        >
                            {row.sort && (
                                <Tooltip
                                    title="Sort"
                                    placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={props.order.id === row.id}
                                        direction={props.order.direction}
                                        onClick={createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            )}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default FormsTableHead;
