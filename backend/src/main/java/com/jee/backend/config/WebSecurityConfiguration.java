package com.jee.backend.config;

import com.jee.backend.service.UserService;
import com.jee.backend.utils.JwtAuthEntryPoint;
import com.jee.backend.utils.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

        @Autowired
        BCryptPasswordEncoder bCryptPasswordEncoder;

        @Autowired
        UserService userDetailsService;

        @Autowired
        JwtAuthEntryPoint unauthorizedHandler;

        @Bean
        public JwtRequestFilter authenticationJwtTokenFilter() {
                return new JwtRequestFilter();
        }

        @Bean
        @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
                return super.authenticationManagerBean();
        }


        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
                auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {

                http.cors().and().csrf().disable()
                        .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                        .authorizeRequests().antMatchers("/users/auth/**").permitAll().and()
                        .authorizeRequests().antMatchers("/users/admin/pdf").permitAll().and()
                        .authorizeRequests().anyRequest().authenticated();
                http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        }
}