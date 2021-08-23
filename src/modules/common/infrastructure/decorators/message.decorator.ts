import { SetMetadata } from '@nestjs/common'

export const Message = (message: string): MethodDecorator => {
  return (_, __, descriptor: PropertyDescriptor) => {
    SetMetadata('message', message)(descriptor.value)
    return descriptor
  }
}
