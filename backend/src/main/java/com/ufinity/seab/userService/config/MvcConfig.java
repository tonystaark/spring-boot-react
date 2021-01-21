package com.ufinity.seab.userService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;

@EnableWebMvc
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public MvcConfig() {
        super();
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/anonymous.html");
        registry.addViewController("/login.html");
        registry.addViewController("/homepage.html");
        registry.addViewController("/admin/adminpage.html");
        registry.addViewController("/accessDenied");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("/WEB-INF/view/react/build/static/");
        registry.addResourceHandler("/*.css").addResourceLocations("/WEB-INF/view/react/build/static/css/");
        registry.addResourceHandler("/*.js").addResourceLocations("/WEB-INF/view/react/build/static/js/");
        registry.addResourceHandler("/*.json").addResourceLocations("/WEB-INF/view/react/build/");
        registry.addResourceHandler("/*.ico").addResourceLocations("/WEB-INF/view/react/build/");
        registry.addResourceHandler("/index.html").addResourceLocations("/WEB-INF/view/react/build/index.html");
    }

    @Bean
    public ViewResolver viewResolver() {
        final InternalResourceViewResolver bean = new InternalResourceViewResolver();

        bean.setViewClass(JstlView.class);
        bean.setPrefix("/WEB-INF/view/");
        bean.setSuffix(".jsp");

        return bean;
    }

}