export class InterpolateActionInputDto {
  @IsString()
  @IsNotEmpty()
  envFile: string;

  @IsBoolean()
  envFileAsFallback: boolean;

  @IsString()
  @IsNotEmpty()
  envVariablePrefix: string;

  @IsString()
  @IsNotEmpty()
  envVariableSuffix: string;

  @IsArray()
  replaceFileExtensions: Array<string>;

  @IsArray()
  replaceFileExcludePaths: Array<string>;
}
