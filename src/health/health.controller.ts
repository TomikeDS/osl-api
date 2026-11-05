import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthResponse } from './health-response.dto.js';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check that the API is running' })
  @ApiOkResponse({ description: 'The API is up.', type: HealthResponse })
  check(): HealthResponse {
    return { status: 'ok' };
  }
}
