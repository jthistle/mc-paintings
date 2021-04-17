/*
 *  Copyright (C) 2021 James Thistlewood
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import React from 'react';
import { useRouter } from 'next/router';

export interface CaptureFunction {
  (to: string, e: React.MouseEvent): void;
}

interface CapturedLinkProps {
  to: string;
  capture?: CaptureFunction;
  children: React.ReactNode;
}

const CapturedLink = ({ to, capture, children }: CapturedLinkProps) => {
  const router = useRouter();

  let callback = (_: React.MouseEvent) => {
    router.push(to);
  };

  if (capture) {
    callback = (e) => capture(to, e);
  }

  return <span onClick={callback}>{children}</span>;
};

export default CapturedLink;
