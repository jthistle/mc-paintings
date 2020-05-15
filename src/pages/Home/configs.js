/*
 *  Copyright (C) 2019 James Thistlewood
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

const SIZES = {
  '1x1': 7,
  '1x2': 2,
  '2x1': 5,
  '2x2': 6,
  '4x2': 1,
  '4x3': 2,
  '4x4': 3,
};

const MC_1_14_NAMES = {
  '1x1': ['alban', 'aztec', 'aztec2', 'bomb', 'kebab', 'plant', 'wasteland'],
  '1x2': ['graham', 'wanderer'],
  '2x1': ['courbet', 'creebet', 'pool', 'sea', 'sunset'],
  '2x2': ['bust', 'match', 'skull_and_roses', 'stage', 'void', 'wither'],
  '4x2': ['fighters'],
  '4x3': ['donkey_kong', 'skeleton'],
  '4x4': ['burning_skull', 'pigscene', 'pointer'],
};

const _p = (x, y) => {
  return { x, y };
}

const _s = (w, h) => {
  return { w, h };
}

// positions and sizes are defined as number of blocks - pixel size depends on the resolution chosen
const BR_1_14_POSITIONS = {
  '1x1': { size: _s(1, 1), positions: [_p(0, 0), _p(1, 0), _p(2, 0), _p(3, 0), _p(4, 0), _p(5, 0), _p(6, 0)] },
  '1x2': { size: _s(1, 2), positions: [_p(0, 4), _p(1, 4)] },
  '2x1': { size: _s(2, 1), positions: [_p(0, 2), _p(2, 2), _p(4, 2), _p(6, 2), _p(8, 2)] },
  '2x2': { size: _s(2, 2), positions: [_p(0, 8), _p(2, 8), _p(4, 8), _p(6, 8), _p(8, 8), _p(10, 8)] },
  '4x2': { size: _s(4, 2), positions: [_p(0, 6)] },
  '4x3': { size: _s(4, 3), positions: [_p(12, 4), _p(12, 7)] },
  '4x4': { size: _s(4, 4), positions: [_p(0, 12), _p(4, 12), _p(8, 12)] }
};

const DEFAULT_PACK_META = {
  name: 'MC Paintings Pack',
  description: 'Generated at mcpaintings.com',
  pack_format: 5,
};

export { SIZES, MC_1_14_NAMES, DEFAULT_PACK_META, BR_1_14_POSITIONS };
