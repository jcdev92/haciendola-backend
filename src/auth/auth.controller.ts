import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../user/dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'User register',
    description: 'Yo can register a user',
  })
  @ApiResponse({ status: 201, description: 'User was created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Logged in' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized, check credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('authStatus')
  @ApiOperation({ summary: 'Check token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, token not valid, login again',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  checkAuthStatus(
    @Body() jwtToken: { token: string },
  ): Promise<{ token: string }> {
    return this.authService.checkAuthStatus(jwtToken);
  }
}
