import React from 'react';
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

const Link = ({ href, children }) => (
  <NextLink href={href} passHref>
    <MUILink>{children}</MUILink>
  </NextLink>
);

export default Link;
