import { Reflector } from '@nestjs/core'

export const Message = Reflector.createDecorator<string>()
