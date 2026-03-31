
import crypto from 'crypto'

export const generateETag = (data: unknown): string => {
    const json = JSON.stringify(data)
    return crypto.createHash('md5').update(json).digest('hex')
}