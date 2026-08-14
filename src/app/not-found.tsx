import { Center } from "@astryxdesign/core/Center";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Link } from "@astryxdesign/core/Link";

export default function NotFound() {
  return (
    <Center height="100%" padding={6}>
      <EmptyState
        headingLevel={1}
        title="문제를 찾을 수 없습니다"
        description="주소가 잘못되었거나 아직 준비되지 않은 문제입니다."
        actions={
          <Link href="/" isStandalone>
            문제 목록으로
          </Link>
        }
      />
    </Center>
  );
}
