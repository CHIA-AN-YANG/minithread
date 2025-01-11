package com.en.training.minithread.aspect;

import com.en.training.minithread.models.Account;
import com.en.training.minithread.util.AuthenticationUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.Optional;

@Aspect
@Component
public class AuthenticationAspect {

    private AuthenticationUtils authenticationUtils;

    @Around("@annotation(com.en.training.minithread.annotation.RequiresAuthenticatedUser)")
    public Object checkAuthentication(ProceedingJoinPoint joinPoint) throws Throwable {
        Optional<Account> userOpt = authenticationUtils.getAuthenticatedUser();

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        Parameter[] parameters = method.getParameters();

        Object[] originalArgs = joinPoint.getArgs();
        int accountParamIndex = getAccountParam(parameters);

        if (accountParamIndex != -1) {
            Object[] newArgs = new Object[originalArgs.length];
            System.arraycopy(originalArgs, 0, newArgs, 0, originalArgs.length);
            newArgs[accountParamIndex] = userOpt.get();
            return joinPoint.proceed(newArgs);
        }

        return joinPoint.proceed();
    }

    private int getAccountParam(Parameter[] parameters){
        for (int i = 0; i < parameters.length; i++) {
            if (parameters[i].getType().equals(Account.class)) {
                return i;
            }
        }
        return -1;
    }
}
