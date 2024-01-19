import { Module } from '@nestjs/common';
import { AxiosAdapter } from './HttpAdapters/axios.adapter';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule {}
