import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Account, AccountDocument } from './account.schema';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    // Check if email already exists
    const existingAccount = await this.accountModel.findOne({ email: createAccountDto.email });
    if (existingAccount) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createAccountDto.password, 10);

    const createdAccount = new this.accountModel({
      ...createAccountDto,
      password: hashedPassword,
    });

    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountModel.findById(id).select('-password').exec();
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.accountModel.findOne({ email }).exec();
    if (!account) {
      throw new NotFoundException(`Account with email ${email} not found`);
    }
    return account;
  }

  async findByRole(role: string): Promise<Account[]> {
    return this.accountModel.find({ role }).select('-password').exec();
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
    // If password is being updated, hash it
    if (updateAccountDto.password) {
      updateAccountDto.password = await bcrypt.hash(updateAccountDto.password, 10);
    }

    const updatedAccount = await this.accountModel
      .findByIdAndUpdate(id, updateAccountDto, { new: true })
      .select('-password')
      .exec();

    if (!updatedAccount) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return updatedAccount;
  }

  async updateVerification(id: string, updateVerificationDto: UpdateVerificationDto): Promise<Account> {
    const account = await this.accountModel.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    if (account.role !== 'landlord') {
      throw new ConflictException('Only landlord accounts can have verification details');
    }

    account.verification_details = {
      ...account.verification_details,
      ...updateVerificationDto,
    } as any;

    await account.save();
    return this.findOne(id);
  }

  async deactivate(id: string): Promise<Account> {
    return this.update(id, { is_active: false });
  }

  async activate(id: string): Promise<Account> {
    return this.update(id, { is_active: true });
  }

  async remove(id: string): Promise<void> {
    const result = await this.accountModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
  }
}