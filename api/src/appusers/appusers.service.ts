import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appuser, AppuserDocument } from './appuser.schema';
import { CreateAppuserDto } from './dtos/create-appuser.dto';
import { UpdateAppuserDto } from './dtos/update-appuser.dto';

@Injectable()
export class AppusersService {
  constructor(@InjectModel(Appuser.name) private appuserModel: Model<AppuserDocument>) {}

  async create(createAppuserDto: CreateAppuserDto): Promise<Appuser> {
    const createdAppuser = new this.appuserModel(createAppuserDto);
    return createdAppuser.save();
  }

  async findAll(): Promise<Appuser[]> {
    return this.appuserModel.find().exec();
  }

  async findByID(id: string): Promise<Appuser> {
    return this.appuserModel.findOne({ _id: id }).exec();
  }

  async findByUsernameAndPassword(username: string, password: string): Promise<Appuser> {
    return this.appuserModel.findOne({ username, password }).exec();
  }

  async updateOne(newAppuser: UpdateAppuserDto): Promise<boolean> {
    const { _id, password } = newAppuser;
    const updateQuery = await this.appuserModel.updateOne({ _id }, { password }).exec();
    return updateQuery.acknowledged;
  }

  async deleteOne(id: string): Promise<Appuser> {
    const targetAppuser = await this.appuserModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return targetAppuser;
  }
}
