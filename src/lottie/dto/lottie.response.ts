import { ObjectType } from '@nestjs/graphql';
import relayTypes from '../../pagination/relay.types';
import { Lottie } from '../entities/lottie.entity';

@ObjectType()
export default class LottieResponse extends relayTypes<Lottie>(Lottie) {}
