import { BadRequestException } from '@nestjs/common';
import {
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';
import { Request } from 'express';

const tenants = new Map<string, ContextId>();

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  getTenantId(request: Request): string {
    // retrieve and return the tenant ID from the request object
    const tenantId = request.headers['x-tenant-id'] as string;

    // throw an exception if the ID is not valid
    if (!tenantId) {
      throw new BadRequestException('Tenant ID is invalid.');
    }

    return tenantId;
  }

  attach(contextId: ContextId, request: Request) {
    // extract the tenant identifier from the request object into the tenantId variable
    const tenantId = this.getTenantId(request);
    let tenantSubTreeId: ContextId;

    if (tenants.has(tenantId)) {
      tenantSubTreeId = tenants.get(tenantId);
    } else {
      tenantSubTreeId = ContextIdFactory.create();
      tenants.set(tenantId, tenantSubTreeId);
    }

    return {
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId,
      payload: { tenantId },
    };
  }
}
