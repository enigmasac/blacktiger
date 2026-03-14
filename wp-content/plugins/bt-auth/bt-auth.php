<?php
/**
 * Plugin Name: BlackTiger Auth
 * Description: Custom REST endpoint for customer authentication.
 * Version: 1.0.0
 */

defined('ABSPATH') || exit;

add_action('rest_api_init', function () {
    register_rest_route('bt-auth/v1', '/login', [
        'methods'             => 'POST',
        'callback'            => 'bt_auth_login',
        'permission_callback' => '__return_true',
    ]);
});

function bt_auth_login(WP_REST_Request $request) {
    $email    = sanitize_email($request->get_param('email'));
    $password = $request->get_param('password');

    if (empty($email) || empty($password)) {
        return new WP_REST_Response(
            ['message' => 'Email y contraseña son requeridos.'],
            400
        );
    }

    $user = wp_authenticate($email, $password);

    if (is_wp_error($user)) {
        return new WP_REST_Response(
            ['message' => 'Credenciales incorrectas.'],
            401
        );
    }

    $customer_id = 0;
    if (function_exists('wc_get_customer')) {
        try {
            $customer    = new WC_Customer($user->ID);
            $customer_id = $customer->get_id();
        } catch (Exception $e) {
            $customer_id = $user->ID;
        }
    } else {
        $customer_id = $user->ID;
    }

    return new WP_REST_Response([
        'customer_id' => $customer_id,
        'email'       => $user->user_email,
        'first_name'  => $user->first_name ?: get_user_meta($user->ID, 'billing_first_name', true),
        'last_name'   => $user->last_name ?: get_user_meta($user->ID, 'billing_last_name', true),
    ], 200);
}
