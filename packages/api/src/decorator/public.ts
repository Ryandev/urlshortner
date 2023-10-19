import type { ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const SetPublic = (publicAccess = true) => SetMetadata(IS_PUBLIC_KEY, publicAccess);

export const IsPublic = (reflector: Reflector, context: ExecutionContext) => {
    const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
    ]);

    return isPublic;
};
