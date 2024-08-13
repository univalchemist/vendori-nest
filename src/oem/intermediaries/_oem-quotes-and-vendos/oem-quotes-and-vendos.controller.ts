import {
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Get,
  Query, UsePipes,
} from '@nestjs/common';

import { AuthUser } from '../../main/oem-users/oem-users.decorators/auth-user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { SessionAuthGuard } from '../../../auth/guards/session-auth.guard';
import { JWTAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { OemQuotesAndVendosService } from './oem-quotes-and-vendos.service';
import { SetCurrentUser } from '../../main/oem-users/oem-users.decorators/set-current-user.decorator';
import { InjectSubHierarchyInterceptor } from '../../../common/interceptors/inject-sub-hierarchy.interceptor';
import { DataAccessInterceptor } from '../../../auth/roles/interceptors/data-access.interceptor';
import { QuoteAndVendoQueryDto, quoteAndVendoQuerySchema } from './oem-quotes-and-vendos.dto/oem-quotes-and-vendos.dto';
import { JoiValidationPipe } from '../../../common/pipes/joi-validation.pipe';

@ApiBearerAuth('JWT-auth')
@ApiTags('Quotes-And-Vendos')
@UseGuards(SessionAuthGuard, JWTAuthGuard)
@UseInterceptors(InjectSubHierarchyInterceptor, DataAccessInterceptor)
@SetCurrentUser
@Controller('quotes-and-vendos')
export class OemQuotesAndVendosController {
  constructor(public service: OemQuotesAndVendosService) {}

  //TODO: We could use CrudParsed, instead of manually parse it
  // also it looks like it gets only 'strings', so it is obviously looks like weakness
  // @update added Joi to prevent sql injection, but still looks like we have lack of security bc we don't use parser properly, need to refactor it!
  @Get(`pending-approval`)
  @ApiOperation({
    description: 'Return my quotes and vendos that are pending for approval',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    schema: {
      type: 'number',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    schema: {
      type: 'number',
      default: 10,
    },
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        default: 'type,ASC',
      },
    },
  })
  @ApiQuery({
    name: 'or',
    required: false,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        default: 'quoteName||$contL||test',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getPendingApproval(
    @AuthUser() user: any,
    @Query(new JoiValidationPipe(quoteAndVendoQuerySchema)) query: QuoteAndVendoQueryDto,
  ) {
    return this.service.getMany('pending-approval', user, query);
  }

  @Get(`all`)
  @ApiOperation({ description: 'Return all my quotes and vendos' })
  @ApiQuery({
    name: 'page',
    required: false,
    schema: {
      type: 'number',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    schema: {
      type: 'number',
      default: 10,
    },
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        default: 'type,ASC',
      },
    },
  })
  @ApiQuery({
    name: 'or',
    required: false,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        default: 'quoteName||$contL||test',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getAll(@AuthUser() user: any, @Query(new JoiValidationPipe(quoteAndVendoQuerySchema)) query: QuoteAndVendoQueryDto) {
    return this.service.getMany('all', user, query);
  }

  @Get(`workflow-pending-approval`)
  @ApiOperation({
    description:
      'Return all my workflow quotes and vendos that are pending for approval',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    schema: {
      type: 'number',
      default: 1,
    },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    schema: {
      type: 'number',
      default: 10,
    },
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        default: 'type,ASC',
      },
    },
  })
  @ApiQuery({
    name: 'or',
    required: false,
    schema: {
      type: 'array',
      items: {
        type: 'string',
        default: 'quoteName||$contL||test',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  getWorkflowPendingApproval(
    @AuthUser() user: any,
    @Query(new JoiValidationPipe(quoteAndVendoQuerySchema)) query: QuoteAndVendoQueryDto,
  ) {
    return this.service.getMany('workflow-pending-approval', user, query);
  }
}
