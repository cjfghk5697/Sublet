import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { MongodbService } from '../mongodb/mongodb.service';
import {
  reservationInterfaceStub,
  reservationStub,
  userStub,
} from '../mongodb/__mocks__/stubs/mongodb.stub';
import { ReservationExportInterface } from '@/interface/reservation.interface';

jest.mock('../mongodb/mongodb.service');

describe('ReservationService', () => {
  let service: ReservationService;
  let mongoDbService: MongodbService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ReservationService, MongodbService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    mongoDbService = module.get(MongodbService);
    jest.clearAllMocks();
  });

  describe('TESTING createReservation (POST /reservation)', () => {
    describe('when calling with normal input', () => {
      let result: boolean | undefined;

      beforeEach(async () => {
        try {
          result = await service.createReservation(
            reservationStub(),
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
          reservationStub(),
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
          expect(result).toEqual([reservationInterfaceStub()]);
        });
      });
    });

    describe('TESTING deleteOneReservation (DELETE /reservation/:reservationKey)', () => {
      describe('when calling with resevation delete inputs', () => {
        let result: boolean | undefined;
        beforeEach(async () => {
          try {
            result = await service.deleteOneReservation(
              reservationStub().key,
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
            reservationStub().key,
            userStub(),
          );
        });
      });
    });
  });
});
