import LRU from 'lru-cache';

import config from '../../config.js';

// Init the LRU cache.
export default LRU({ 'max': config.CACHE_SIZE });
