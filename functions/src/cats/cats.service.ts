import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./interfaces/cat.interface";
import * as admin from "firebase-admin";

@Injectable()
export class CatsService {
  private readonly collectionRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor() {
    admin.initializeApp();
    const db = admin.firestore();
    this.collectionRef = db.collection("cats");
  }

  create(createCatDto: CreateCatDto) {
    const newDocRef = this.collectionRef.doc();
    return newDocRef.set(createCatDto);
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const docRef = this.collectionRef.doc(id);

    try {
      const result = await docRef.update(updateCatDto);
      return result;
    } catch {
      throw new HttpException("Cat not found", HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    const snapshot = await this.collectionRef.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const result = await this.collectionRef.doc(id).get();

    if (!result.exists) {
      throw new HttpException("Cat not found", HttpStatus.NOT_FOUND);
    }

    return { id, ...result.data() };
  }

  remove(id: string) {
    return this.collectionRef.doc(id).delete();
  }
}
