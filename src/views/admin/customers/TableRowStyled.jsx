import React from 'react';
import {
  Avatar,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TableRowStyled = ({ row, state, handleOpenMenu }) => {
  const { id, name, role, status, company, avatarUrl, isVerified } = row;
  const selectedUser = state.selected.indexOf(name) !== -1;

  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      role="checkbox"
      selected={selectedUser}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedUser}
          onChange={(event) => handleClick(event, name)}
        />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">{company}</TableCell>

      <TableCell align="left">{role}</TableCell>

      <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

      <TableCell align="left">{sentenceCase(status)}</TableCell>

      <TableCell align="right">
        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableRowStyled;
