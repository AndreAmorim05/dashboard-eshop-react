import React, { useState } from 'react';
import {
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserListHead from './UserListHead';
import UserListToolbar from './UserListToolbar';
import TableRowStyled from './TableRowStyled';
import USERLIST from './mock';
import { getComparator, applySortFilter } from './utils';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function CustomersTable() {
  const [state, setState] = useState({
    open: null,
    page: 0,
    order: 'asc',
    selected: [],
    orderBy: 'name',
    filterName: '',
    rowsPerPage: 5,
  });

  const handleOpenMenu = (event) => {
    setState((prevState) => ({ ...prevState, open: event.currentTarget }));
  };

  const handleCloseMenu = () => {
    setState((prevState) => ({ ...prevState, open: null }));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    setState((prevState) => ({
      ...prevState,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    }));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setState((prevState) => ({ ...prevState, selected: newSelecteds }));
      return;
    }
    setState((prevState) => ({ ...prevState, selected: [] }));
  };

  const handleClick = (event, name) => {
    const selectedIndex = state.selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(state.selected.slice(1));
    } else if (selectedIndex === state.selected.length - 1) {
      newSelected = newSelected.concat(state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        state.selected.slice(0, selectedIndex),
        state.selected.slice(selectedIndex + 1)
      );
    }
    setState((prevState) => ({ ...prevState, selected: newSelected }));
  };

  const handleChangePage = (event, newPage) => {
    setState((prevState) => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  };

  const handleFilterByName = (event) => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      filterName: event.target.value,
    }));
  };

  const emptyRows =
    state.page > 0
      ? Math.max(0, (1 + state.page) * state.rowsPerPage - USERLIST.length)
      : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(state.order, state.orderBy),
    state.filterName
  );

  const isNotFound = !filteredUsers.length && !!state.filterName;

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <UserListToolbar
          numSelected={state.selected.length}
          filterName={state.filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader aria-label="sticky table">
            <UserListHead
              order={state.order}
              orderBy={state.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={USERLIST.length}
              numSelected={state.selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(
                  state.page * state.rowsPerPage,
                  state.page * state.rowsPerPage + state.rowsPerPage
                )
                .map((row) => (
                  <TableRowStyled
                    key={row.name}
                    row={row}
                    state={state}
                    handleOpenMenu={handleOpenMenu}
                  />
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{state.filterName}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={USERLIST.length}
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Popover
        open={Boolean(state.open)}
        anchorEl={state.open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <EditIcon sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
