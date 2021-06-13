import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LottieService } from './lottie.service';
import { Lottie } from './entities/lottie.entity';
import { CreateLottieInput } from './dto/create-lottie.input';
import LottieResponse from './dto/lottie.response';
import LottieConnectionArgs from './dto/pagination/lottie.connection.args';
import { connectionFromArraySlice } from 'graphql-relay';

@Resolver(() => Lottie)
export class LottieResolver {
  constructor(private readonly lottieService: LottieService) {}

  // Resolver for creating a new Lottie record
  @Mutation(() => Lottie)
  async createLottie(
    @Args('createLottieInput') createLottieInput: CreateLottieInput,
  ): Promise<Lottie> {
    return await this.lottieService.create(createLottieInput);
  }

  // Paginated query for getting Lotties
  @Query(() => LottieResponse, { name: 'lotties' })
  async findAll(@Args() args: LottieConnectionArgs): Promise<LottieResponse> {
    const { limit, offset, filter, sort } = args.pagingParams();
    const [lotties, count] = await this.lottieService.findAll(
      limit,
      offset,
      filter,
      sort,
    );
    const page = connectionFromArraySlice(lotties, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });
    return { page, pageData: { count, limit, offset } };
  }

  // Query for getting details of a specific lottie
  @Query(() => Lottie, { name: 'lottie' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Lottie> {
    return this.lottieService.findOne(id);
  }
}
