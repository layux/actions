import { Injectable } from '@layux/injector';

@Injectable()
export class VariableInterpolateService {
  async interpolateFileVariables(
    targetFile: string,
    variablesToInterpolate: Map<string, unknown>
  ): Promise<boolean> {
    // Read file contents as UTF-8
    // look for variables matching variablesToInterpolate
    // replace placeholder with actual value
  }
}
