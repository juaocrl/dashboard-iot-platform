-- CreateEnum
CREATE TYPE "public"."devicestatus" AS ENUM ('active', 'inactive', 'blocked');

-- CreateEnum
CREATE TYPE "public"."sensortype" AS ENUM ('temp', 'hum', 'press', 'custom');

-- CreateTable
CREATE TABLE "public"."devices" (
    "id" TEXT NOT NULL,
    "device_uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "last_seen" TIMESTAMP(3),
    "status" "public"."devicestatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sensors" (
    "id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "type" "public"."sensortype" NOT NULL,
    "unit" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "sensors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."readings" (
    "id" BIGSERIAL NOT NULL,
    "sensor_id" TEXT NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL,
    "value_num" DOUBLE PRECISION,
    "value_txt" TEXT,
    "raw" JSONB,
    "ingested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."api_keys" (
    "id" TEXT NOT NULL,
    "device_id" TEXT NOT NULL,
    "key_hash" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3),
    "revoked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_logs" (
    "id" BIGSERIAL NOT NULL,
    "actor_device_id" TEXT,
    "action" TEXT NOT NULL,
    "target_type" TEXT NOT NULL,
    "target_id" TEXT,
    "ip" TEXT,
    "ts" TIMESTAMP(3) NOT NULL,
    "details" JSONB,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_device_uid_key" ON "public"."devices"("device_uid");

-- CreateIndex
CREATE INDEX "readings_ts_idx" ON "public"."readings"("ts");

-- AddForeignKey
ALTER TABLE "public"."sensors" ADD CONSTRAINT "sensors_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."readings" ADD CONSTRAINT "readings_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "public"."sensors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."api_keys" ADD CONSTRAINT "api_keys_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_actor_device_id_fkey" FOREIGN KEY ("actor_device_id") REFERENCES "public"."devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
