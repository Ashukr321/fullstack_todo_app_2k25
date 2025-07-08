import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	message: {
		en: "Too many requests, please try again later.",
	}
})

export default limiter;