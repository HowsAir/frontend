import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY as string;
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

/**
 * @brief Redirects the user to the Stripe checkout page using the provided session ID.
 * @author Juan Diaz
 *
 * This function loads the Stripe.js library and redirects the user to the checkout
 * page using the provided session ID. If there's an error loading Stripe or
 * redirecting to checkout, it will be caught and logged.
 *
 * @param sessionId - The ID of the Stripe checkout session to redirect to.
 */
export const redirectToCheckout = async (sessionId: string) => {
    try {
        const stripe = await stripePromise;

        if (!stripe) {
            throw new Error('Stripe failed to load.');
        }

        const result = await stripe.redirectToCheckout({ sessionId });

        // If result.error is present, it indicates an error during redirection
        if (result.error) {
            throw new Error(result.error.message);
        }
    } catch (error) {
        console.error('Error during checkout redirection:', error);
    }
};
