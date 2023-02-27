import React from 'react';
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material';

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick,
  onRequestSort,
}) {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  const handleSelectAllClick = (event) => {
    onSelectAllClick(event.target.checked);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
          />
        </TableCell>
        {headLabel.map((headCell) => {
          const align = headCell.alignRight ? 'right' : 'left';
          const isActive = orderBy === headCell.id;
          const isAsc = isActive && order === 'asc';

          return (
            <TableCell key={headCell.id} align={align}>
              <TableSortLabel
                hideSortIcon
                active={isActive}
                direction={isAsc ? 'asc' : 'desc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {isActive && (
                  <Box sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                )}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default React.memo(UserListHead);
