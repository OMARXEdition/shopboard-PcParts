import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
afterEach(cleanup)

import { vi } from 'vitest'
vi.stubEnv('BASE_URL', '/Shopboard-PcParts/')
