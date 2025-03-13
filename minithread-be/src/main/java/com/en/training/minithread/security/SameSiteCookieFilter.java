package com.en.training.minithread.security;

import org.springframework.stereotype.Component;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class SameSiteCookieFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        chain.doFilter(request, response);

        if (response instanceof HttpServletResponse) {
            HttpServletResponse res = (HttpServletResponse) response;
            String cookieHeader = res.getHeader("Set-Cookie");

            if (cookieHeader != null) {
                // Append SameSite=None and Secure if not already present
                res.setHeader("Set-Cookie", cookieHeader + "; SameSite=None; Secure");
            }
        }
    }
}