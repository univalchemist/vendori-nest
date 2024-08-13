import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { NODE_ENV } from '../../../environments';

const Tokens = {
  staging:
    'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlbW9fYWRtaW5AdmVuZG9yaS5jb20iLCJzdWIiOjIsImlkX3Rva2VuIjoiZXlKcmFXUWlPaUp0VVdka2RGYzBMVEZtYzI5T05FZHlNVE5UVW1OVUxYSllNMk14YTFaVmJIRnRWalF3UkVaS0xUQmpJaXdpWVd4bklqb2lVbE15TlRZaWZRLmV5SnpkV0lpT2lJd01IVTFhMjltTUdKelUwOTBXbWd3VXpWa055SXNJbTVoYldVaU9pSkVaVzF2SUVGa2JXbHVJaXdpZG1WeUlqb3hMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyUmxkaTAzTWpZMU1EZzBOQzV2YTNSaExtTnZiU0lzSW1GMVpDSTZJakJ2WVRSNVpqa3daRFJ6V1dGSmExaFJOV1EzSWl3aWFXRjBJam94TmpjNU1EWTJNVEkyTENKbGVIQWlPakUyTnprd05qazNNallzSW1wMGFTSTZJa2xFTGw5dWEyOHlURkl0V0RoWFREbGxjblpmYVZCdlFua3ljVmRZUXpGSlRrRTJjMWxvYTFoV1NETlVabWNpTENKaGJYSWlPbHNpY0hka0lsMHNJbWxrY0NJNklqQXdielJpY25keWJHdHBja05vTWtWaU5XUTNJaXdpY0hKbFptVnljbVZrWDNWelpYSnVZVzFsSWpvaVJHVnRiMTloWkcxcGJrQjJaVzVrYjNKcExtTnZiU0lzSW1GMWRHaGZkR2x0WlNJNk1UWTNPVEEyTlRRNU1pd2lZWFJmYUdGemFDSTZJbTQyVjNVdFV6RTRXVVJtVVU1cFIycDVUbkUzWm1jaWZRLlBJZ0pKR0JDV3N1ZVNzcTdrSU5QSWdRejM5clVlVEZ6aHNxVlhKNHhPTWJjWDI2bVpQMkJvY0FOVXZOa1hnaTF5R1VLY044TnN3aGtoalZlYnpHT3pIMzJFVUdfZEZEcVBob2RhenU2MzhfZ2ZJV1ZEZm9wRjJnRU8wenZZU3BZd0VUbUNib2lITFdBQVBsMVduSnVfRF9SZEdrZGRyVlhYUGFvZ1ZXOFJ3dFpjTGF2MzhBZUQydGtwS2VkdzRKYnJGbkpzNnJINjZOV0s4MlZkdWZubktuR0I3SHJIcEdJakFoN2NNb3I1Rk5wNFpuMkFMNGM2UHlPZDloaTZBYm1pYV9nYkZDYWlwT2dyTzYwN1cwRGJRLTdXTlo3ZnEwMjE2R25HRjRSRHpCSXF6S2ZpX0FPclduLVE0Q3ZOVEVwY3N1RGFOUzh5YWFPUUNwaW5tWWZwdyIsImlhdCI6MTY3OTA2NjEyNywiZXhwIjoxNjg2ODQyMTI3fQ.hnRu6PdWo2Ca9SwxNLpSb2rnxQiMnX9GnoJySDOCpJlcZqiG_HglS6Exjzx3SlyV',
  staging_new:
    'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zY2FyQHZlbmRvcmkuY29tIiwiaWF0IjoxNjg2ODQ3NTE5LCJleHAiOjE3MTg0MDUxMTl9.vjjXyoGuOPXSiHMS5j6hpIws2PkOla6xqgoODLqt8tcOy4zVp3MYkzTLOxcnbCgU',
  mock: 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlbW9fYWRtaW5AdmVuZG9yaS5jb20iLCJzdWIiOjIsImlkX3Rva2VuIjoiZXlKcmFXUWlPaUpLUTNZeWFESmlMVUZ1V1habFRuRlpMVXBHTVVjeFptaHVUVzFCUmw5d1dHOWxhalJIYjNod2VtNWpJaXdpWVd4bklqb2lVbE15TlRZaWZRLmV5SnpkV0lpT2lJd01IVTFhMjltTUdKelUwOTBXbWd3VXpWa055SXNJbTVoYldVaU9pSkVaVzF2SUVGa2JXbHVJaXdpZG1WeUlqb3hMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyUmxkaTAzTWpZMU1EZzBOQzV2YTNSaExtTnZiU0lzSW1GMVpDSTZJakJ2WVRSNVpqa3daRFJ6V1dGSmExaFJOV1EzSWl3aWFXRjBJam94Tmpnd05qY3dNakE1TENKbGVIQWlPakUyT0RBMk56TTRNRGtzSW1wMGFTSTZJa2xFTGtsUmIyaEthM1JIVTJsTFgycEpRMFZZVldkeVozSXpjekpvUlZJMVltZDRWWGR4Y1RWNGJXODVhbGtpTENKaGJYSWlPbHNpY0hka0lsMHNJbWxrY0NJNklqQXdielJpY25keWJHdHBja05vTWtWaU5XUTNJaXdpY0hKbFptVnljbVZrWDNWelpYSnVZVzFsSWpvaVJHVnRiMTloWkcxcGJrQjJaVzVrYjNKcExtTnZiU0lzSW1GMWRHaGZkR2x0WlNJNk1UWTRNRFkyTnpNME1pd2lZWFJmYUdGemFDSTZJa3QzYldOS1lqRkVPR3BVTm5aSFRIVnlPR3MzVVdjaWZRLldmbFBIQUQzRHhSY01UMDJXQ01ibEhaQUNPeXVOV3FpNnV2b2F3MHV2aU9rV0M1dnNPa1ZwU2hGdUd2dWg5eTFuTW5Md25oemhCT3B0R01jeVdYRjJ2V2lPZG1TT1BXTkdZQTNjQWtsT0JiS1M2TklrQVhIZXFBRXoxcUliWUFSSUNnVmxWLW1FTHI1RWJQbzJ3M052X3pfTnN2Unp0djhudGctR1M1STlVNlIteHJGNWNJVjBkSDBoWnA2NHBQVUpIRHZ1ejRRRmNYWE5xcmFvY3l2ZTV2TlZZOWJaZGFxMTNRX2tLdVRqR3hrTlBkMDZpX3dRUV9yR1VUQWsyRXlTczd1WXVlLV9WS2NkV3VrY3RYVnVtTlB5MnBWTjJRSklhem5NelFseVBjTEF6YkZaaDBnS1hqTWNDQUcxMDZJc2lISDJvYWI1VG5BQTVKaEpwTkdzdyIsImlhdCI6MTY4MDY3MDIxMCwiZXhwIjoxNjg4NDQ2MjEwfQ.IUtkG8EjIIxbM_TbDozdnOrnF16NxTdorkvnW4br2Nd1pxjigwS0iED4kImMbBwf',
  mock_new:
    'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9zY2FyQHZlbmRvcmkuY29tIiwiaWF0IjoxNjg2NzY0NTY2LCJleHAiOjE3MTgzMjIxNjZ9.ORa3uNvQGhuyKg6rutuJGQLgEWSc00EGcKBZigdOEWXtmJEp4PBNcIBvO2cX7c7J',
  brokenToken:
    '6d6EH7hAIfAxmbZLJpumpGjN8pCoSoixBYFM3jEOK0pG2Rg92bLHYMAKwki59lkrpdy5fpVr1Q-ie1fVedGObIATkWBjv9PUrFsTxf-lLnmUiof3NHcE3epDi7DvObM4Zxk1NmCGKxfCe2VKBZtGU2cYCLqVh2jb-oEV1L07VbrdEO_UHEpbyKRExyym_qcZ',
};

@ApiBearerAuth('JWT-auth')
@ApiTags('ThirdPartyToken')
@Controller('auth-token')
export class OemThirdPartyTokenController {
  constructor(@Inject(REQUEST) private request) {}

  get base() {
    return this;
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Returning a user from token/cookie.',
  })
  async login(@Req() request) {
    const authHeader =
      request.headers['Authorization'] || request.headers['authorization'];

    if (
      authHeader === `Bearer ${Tokens[NODE_ENV]}` ||
      authHeader === `Bearer ${Tokens[`${NODE_ENV}_new`]}` ||
      authHeader === `Bearer ${Tokens.brokenToken}`
    )
      return {
        status: 200,
        message: 'A new Token is Generated',
        success: true,
        data: { token: Tokens[`${NODE_ENV}_new`] },
      };
    else
      throw new UnauthorizedException(
        `The provided token must be a previously issued expired token or a valid token.`,
      );
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Returning a user from token/cookie.',
  })
  me(@Req() request) {
    const authHeader =
      request.headers['Authorization'] || request.headers['authorization'];

    if (authHeader === `Bearer ${Tokens[NODE_ENV]}`)
      return {
        status: 200,
        message: 'This Token is Valid',
        success: true,
        data: {},
      };
    else throw new UnauthorizedException(`This token is not valid.`);
  }
}
