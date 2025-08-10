package site.stealthy.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
       registry 
            .addResourceHandler("/**")
            .addResourceLocations("classpath:/static/browser")
            .resourceChain(true)

            .addResolver(
                new PathResourceResolver() {
                    @Override
                    protected Resource getResource(@NonNull String resourcePath, @NonNull Resource location) throws java.io.IOException {
                        Resource requestedResource = location.createRelative(resourcePath);

                        if(requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        }

                        return new ClassPathResource("/static/browser/index.html");
                    };
                }
            );
    }
}
