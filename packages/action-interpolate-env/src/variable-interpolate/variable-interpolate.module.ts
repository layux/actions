import { Module } from "@layux/injector";
import { VariableInterpolateService } from "./variable-interpolate.service";

@Module({
  providers: [VariableInterpolateService],
  exports: [VariableInterpolateService]
})
export class VariableInterpolateModule {}
