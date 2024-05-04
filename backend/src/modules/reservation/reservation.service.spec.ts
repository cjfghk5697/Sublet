import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import {
  reservationExportStub,
  reservationDtoStub,
  userStub,
} from '../../stubs/mongodb.stub';
import {
  ReservationBase,
  ReservationExportInterface,
} from '@/interface/reservation.interface';
import { MongodbModule } from '../mongodb/mongodb.module';
import { MongodbReservationService } from '../mongodb/mongodb.reservation.service';
import { ReservationDto } from '@/dto/reservation.dto';

jest.mock('../mongodb/mongodb.post.service');
jest.mock('../mongodb/mongodb.postimage.service');
jest.mock('../mongodb/mongodb.postkey.service');
jest.mock('../mongodb/mongodb.reservation.service');
jest.mock('../mongodb/mongodb.user.service');

describe('ReservationService', () => {
  let service: ReservationService;
  let mongoDbService: MongodbReservationService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongodbModule],
      providers: [ReservationService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    mongoDbService = module.get(MongodbReservationService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TESTING createReservation (POST /reservation)', () => {
    describe('when calling with normal input', () => {
      let result: boolean | undefined;

      beforeEach(async () => {
        try {
          result = await service.createReservation(
            reservationDtoStub(),
            userStub(),
          );
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to create reservation', () => {
        expect(mongoDbService.createReservation).toHaveBeenCalledTimes(1);
        expect(mongoDbService.createReservation).toHaveBeenCalledWith(
          reservationDtoStub(),
          userStub(),
        );
      });
    });

    describe('TESTING getAllReservations (GET /reservation)', () => {
      describe('When calling with NaN parameters', () => {
        let result: ReservationExportInterface[] | Error;
        beforeEach(async () => {
          try {
            result = await service.getAllReservation(userStub().user_id);
          } catch (e) {
            result = e;
          }
        });

        it('should call db with default parameters', async () => {
          expect(mongoDbService.getAllReservations).toHaveBeenCalledWith(
            userStub().user_id,
          );
        });

        it('should return one reservation', () => {
          expect(result).toEqual([reservationExportStub()]);
        });
      });
    });

    describe('TESTING deleteOneReservation (DELETE /reservation/:reservationKey)', () => {
      describe('when calling with resevation delete inputs', () => {
        let result: boolean | undefined;
        beforeEach(async () => {
          try {
            result = await service.deleteOneReservation(
              reservationDtoStub().key,
              userStub(),
            );
          } catch (e) {
            result = undefined;
          }
        });

        it('then should return boolean', () => {
          expect(result).toBeDefined();
        });

        it('then should call db to delete reservation', () => {
          expect(mongoDbService.deleteOneReservation).toHaveBeenCalledTimes(1);
        });

        it('then should call db to delete reservation with given parameters', () => {
          expect(mongoDbService.deleteOneReservation).toHaveBeenCalledWith(
            reservationDtoStub().key,
            userStub(),
          );
        });
      });
    });

    describe('TESTING putReservationByKey (PUT /reservation/)', () => {
      describe('when calling with reservation update inputs', () => {
        let result: boolean | undefined;
        beforeEach(async () => {
          try {
            result = await service.putReservationByKey(
              reservationDtoStub().key,
              reservationDtoStub().reservation_progress,
            );
          } catch (e) {
            result = undefined;
          }
        });

        it('then should return ExportInterface', () => {
          expect(result).toBeDefined();
          expect(result).toEqual(reservationDtoStub());
        });

        it('then should call db to update post', () => {
          expect(mongoDbService.putReservationByKey).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
